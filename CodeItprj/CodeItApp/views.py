from django.shortcuts import render

# Create your views here.
# here you can writes views/functions for specific pages , right now its just rendering the template(you can add logic)
def index(request):
    return render(request, 'CodeItApp/index.html')

def refiner(request):
    return render(request, 'CodeItApp/refine.html')

def obfuscate(request):
    return render(request, 'CodeItApp/obfuscation.html')

def timecomplexity(request):
    return render(request, 'CodeItApp/timeComplexity.html')

# you can write login and signup logic here 

# def login(request):
#     return render(request, 'CodeItApp/login.html')

# def signup(request):
#     return render(request, 'CodeItApp/signup.html')
