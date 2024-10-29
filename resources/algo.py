def main():
    lines = []
    print("Enter your code (press Enter twice to finish):")
    
    # Read lines of input until a blank line is encountered
    while True:
        line = input()
        if line.strip() == "":
            break
        lines.append(line)

    # Extract function name
    function_name = None
    for line in lines:
        if 'def ' in line:
            # Use partition for cleaner extraction of function name
            definition = line.partition('def ')[2].strip()
            function_name = definition.split('(')[0]  # Get the function name
            break

    # Check if a function definition was found
    if function_name is None:
        print("No function definition found.")
        return

    # Create output code
    output_code = "\n".join(lines) + "\n\n"
    output_code += "\t\t\n\t\t\n\t\t\n\t\t\n"  # Indentation for readability
    output_code += "#testCase\n\n"
    output_code += f"obj = Solution()\nprint(obj.{function_name}())"  # Add parentheses for function call

    # Print the output code
    print(output_code)

if __name__ == "__main__":
    main()
