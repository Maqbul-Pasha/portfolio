from django.shortcuts import render

# Create your views here.
import requests
from django.http import JsonResponse
from django.views import View
from django.conf import settings

class WeatherView(View):
    def get(self, request):
        city = request.GET.get('city', 'Montreal')  # Default city
        api_key = settings.OPENWEATHER_API_KEY
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        
        try:
            response = requests.get(url)
            response.raise_for_status()  # This will raise an HTTPError for bad responses
            data = response.json()
            return JsonResponse(data)
        except requests.exceptions.HTTPError as http_err:
            return JsonResponse({'error': str(http_err)}, status=500)
        except Exception as err:
            return JsonResponse({'error': str(err)}, status=500)
