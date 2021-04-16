import json

with open('./JSON_Data/keywordToTitlesMap.json') as f:
  data = json.load(f)

newDict = {}
for (keyword, titles) in data.items():
	for title in titles:
		if(title not in newDict):
			newDict[title] = []
		newDict[title].append(keyword)

print(newDict)

with open("titleToKeywordsMap.json", "w") as outfile: 
    json.dump(newDict, outfile)