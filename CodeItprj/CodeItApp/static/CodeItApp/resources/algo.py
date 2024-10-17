lines = []
while True:
    line = input()
    if line.strip() == "":
        break
    lines.append(line)

for i in lines:
    if 'def' in i:
        definition=i.strip()[4:-1]
definition=definition.replace("self, ","")

output_code=""
for i in lines:
    output_code+=i
    output_code+="\n"
    if 'def' in i:
        break

output_code+="\t\t\n\t\t\n\t\t\n\t\t\n"
output_code+="#testCase\n\nobj=Solution()\nprint(obj.{})".format(definition)
print(output_code)