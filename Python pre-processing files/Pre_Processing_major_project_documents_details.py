import json

with open('./JSON_Data/filesMap.json') as f:
  data = json.load(f)

newDict = {}
for (fileName, link) in data.items():
	bibtex = link.replace("Paper.pdf", "Bibtex.bib")
	metadata = link.replace("Paper.pdf", "Metadata.json")
	newDict[fileName] = [bibtex, metadata, link]

print(newDict)

with open("documentsData.json", "w") as outfile: 
    json.dump(newDict, outfile)