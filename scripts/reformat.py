import json
import os

path = '../content'

for folder in os.listdir(path):
    folder_path = os.path.join(path, folder)
    if os.path.isdir(folder_path):
        for json_file in os.listdir(folder_path):
            if json_file.endswith('.json'):
                json_file_path = os.path.join(folder_path, json_file)
                with open(json_file_path, encoding="iso-8859-1") as f:
                    data = json.load(f)
                image = data.pop("image", None)
                if image:
                    data["images"] = [image]
                with open(json_file_path, 'w') as f:
                    json.dump(data, f, indent=2)