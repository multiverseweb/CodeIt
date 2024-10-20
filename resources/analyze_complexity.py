import ast

def analyze_time_complexity(code_snippet):
    try:
        # Parse the code snippet into an Abstract Syntax Tree (AST)
        tree = ast.parse(code_snippet)
        
        # Start with a default time complexity
        complexity = "O(1)"  # Default case for no loops or recursion
        
        # Initialize counters for loops and recursion depth
        loop_count = 0
        nested_loop_depth = 0
        current_depth = 0

        # Walk through the AST nodes and analyze the structure
        for node in ast.walk(tree):
            if isinstance(node, (ast.For, ast.While)):
                loop_count += 1
                current_depth += 1
                nested_loop_depth = max(nested_loop_depth, current_depth)
            elif isinstance(node, ast.FunctionDef):
                # Detect recursion by checking function calls within the function definition
                if any(isinstance(child, ast.Call) for child in ast.walk(node)):
                    complexity = "O(2^n)"  # Recursive function detected

        # Adjust complexity based on the depth of the loops
        if nested_loop_depth == 1:
            complexity = "O(n)"
        elif nested_loop_depth == 2:
            complexity = "O(n^2)"
        elif nested_loop_depth > 2:
            complexity = f"O(n^{nested_loop_depth})"
        
        # Return the calculated complexity
        return complexity

    except MemoryError:
        # Handle memory issues for very large inputs
        return "Error: Code snippet too large to analyze."
    except SyntaxError:
        # Handle invalid Python code
        return "Error: Invalid Python syntax."
    except Exception as e:
        # Catch any other exceptions and return a helpful error message
        return f"Error analyzing code: {str(e)}"
