from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Remove or customize help texts for each field
        self.fields['username'].help_text = ''  # Removes username help text
        self.fields['password1'].help_text = ''  # Removes password1 help text
        self.fields['password2'].help_text = ''  # Removes password2 help text
