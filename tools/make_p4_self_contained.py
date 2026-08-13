import os, base64, json, time, urllib.request, urllib.error, re

repo=os.environ['REPO']
token=os.environ['GH_TOKEN']
api=f'https://api.github.com/repos/{repo}/contents/index.html'
headers={
    'Authorization':f'Bearer {token}',
    'Accept':'application/vnd.github+json',
    'X-GitHub-Api-Version':'2022-11-28',
    'User-Agent':'sports-fiesta-fix'
}

replacement="""function buildQuestions(){
  // Balanced, unique scale readings. 1P = 10; 2P = 12.
  const chosen=[];
  const used=new Set();
  for(let kg=0;kg<=4;kg++){
    const band=[];
    for(let g=100;g<=900;g+=100) band.push(kg*1000+g);
    shuffle(band).slice(0,2).forEach(v=>{chosen.push(v);used.add(v)});
  }
  if(TOTAL>chosen.length){
    const remaining=[];
    for(let grams=100;grams<=4900;grams+=100){
      if(grams%1000!==0&&!used.has(grams))remaining.push(grams);
    }
    chosen.push(...shuffle(remaining).slice(0,TOTAL-chosen.length));
  }
  return shuffle(chosen).slice(0,TOTAL).map(totalGrams=>({
    totalGrams,
    kg:Math.floor(totalGrams/1000),
    g:totalGrams%1000
  }));
}

// ---------- scale ----------"""

for attempt in range(20):
    req=urllib.request.Request(api,headers=headers)
    with urllib.request.urlopen(req) as r:
        data=json.load(r)
    raw=base64.b64decode(data['content']).decode()
    s=re.sub(r'function buildQuestions\(\)\{.*?\n\}\n\n// ---------- scale ----------',replacement,raw,count=1,flags=re.S)
    lines=[]
    for line in s.splitlines():
        if 'limkimsze-maker.github.io/P3-Length-Mass-and-Volume-Sports-Fiesta-/sports-fiesta-' in line:
            continue
        if 'practice4-next-native-' in line or 'sports-fiesta-next-guard-v1.js' in line:
            continue
        lines.append(line)
    s='\n'.join(lines)
    local='''<script src="practice4-back-to-hub-local-v1.js?v=20260813a"></script>\n<script src="practice4-progress-local-v1.js?v=20260813a"></script>\n'''
    if 'practice4-back-to-hub-local-v1.js' not in s:
        s=s.replace('</body>',local+'</body>')
    s=s.rstrip()+'\n'
    if s==raw:
        print('Already self-contained')
        break
    payload=json.dumps({
        'message':'Make Practice 4 gameplay self-contained',
        'content':base64.b64encode(s.encode()).decode(),
        'sha':data['sha']
    }).encode()
    req=urllib.request.Request(api,data=payload,headers={**headers,'Content-Type':'application/json'},method='PUT')
    try:
        with urllib.request.urlopen(req) as r:
            print('Updated',json.load(r)['commit']['sha'])
        break
    except urllib.error.HTTPError as e:
        if e.code in (409,422):
            time.sleep(1+attempt/2)
            continue
        raise
else:
    raise SystemExit('Could not update index after retries')
