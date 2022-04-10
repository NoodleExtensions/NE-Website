import json

a = json.load(open("a.json"))
a["a"] = 2
json.dump(a, open("a.json", 'w'))
