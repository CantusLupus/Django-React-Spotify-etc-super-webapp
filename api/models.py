from django.db import models
import random
import string


def generate_code():

  while True:
    code = ''.join(random.choices(string.ascii_uppercase, k=6))
    if Room.objects.filter(code=code).count() == 0:
      break

  return code


# Create your models here.
class Room(models.Model):
  code = models.CharField(max_length=6, default=generate_code, unique=True)
  host = models.CharField(unique=True, max_length=50)
  guest_can_pause = models.BooleanField(null=False, default=False)
  guest_can_skip = models.BooleanField(null=False, default=False)
  created_at = models.DateTimeField(auto_now_add=True)