import json, urllib.request, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
fail = []

def check(cond, msg):
    if not cond:
        fail.append(msg)

raw = open(os.path.join(ROOT, 'data.js'), encoding='utf-8').read()
prefix = 'window.PORTAL_DATA = '
check(raw.startswith(prefix), 'data.js missing PORTAL_DATA prefix')
data = json.loads(raw[len(prefix):].rstrip().rstrip(';'))
man = json.load(open(os.path.join(ROOT, 'MANIFEST.json'), encoding='utf-8'))

n = data['counts']['spaces']
wired = 0
seen = set()
for v in data['verticals']:
    for s in v['spaces']:
        check(s['id'] not in seen, 'space wired twice: ' + s['id'])
        seen.add(s['id'])
        check(s['url'] == 'https://huggingface.co/spaces/SZLHOLDINGS/' + s['id'], 'bad url for ' + s['id'])
check(len(seen) == n, 'wired spaces ' + str(len(seen)) + ' != census count ' + str(n))
check(set(man['spaces'].keys()) == seen, 'MANIFEST spaces do not match data.js exactly')
check(len(man['repos']) == data['counts']['repos'], 'MANIFEST repo count != data count')

dead = 0
for v in data['verticals']:
    for s in v['spaces']:
        try:
            req = urllib.request.Request(s['url'], method='HEAD', headers={'User-Agent': 'szl-portal-ci/1.0'})
            with urllib.request.urlopen(req, timeout=30) as r:
                if r.status >= 400:
                    dead += 1
                    fail.append('space not reachable: ' + s['url'])
        except Exception as e:
            dead += 1
            fail.append('space probe fail ' + s['url'] + ' ' + repr(e))

if fail:
    print('VALIDATION FAILED (' + str(len(fail)) + ' issues, ' + str(dead) + ' unreachable):')
    for f in fail[:40]:
        print(' - ' + f)
    sys.exit(1)
print('VALID: ' + str(n) + ' spaces wired exactly once, all reachable; manifest reconciles to ' + str(data['counts']['repos']) + ' repos')
