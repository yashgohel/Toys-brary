import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import CustomUser, Product

# Data to populate
products_data = [
  {
    "id": 1,
    "name": "RC Monster Truck",
    "rating": 5,
    "reviews": 120,
    "price": 29.99,
    "category": "Remote Control",
    "ageGroup": "6-8 Years",
    "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 2,
    "name": "Building Block Set",
    "rating": 5,
    "reviews": 120,
    "price": 29.99,
    "category": "Educational Toys",
    "ageGroup": "3-5 Years",
    "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 3,
    "name": "Dancing Robot",
    "rating": 5,
    "reviews": 120,
    "price": 29.99,
    "category": "Action Figures",
    "ageGroup": "6-8 Years",
    "image": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 4,
    "name": "Teddy Bear Soft Toys",
    "rating": 5,
    "reviews": 120,
    "price": 29.99,
    "category": "Baby Toys",
    "ageGroup": "0-2 Years",
    "image": "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 5,
    "name": "Magic Drawing Board",
    "rating": 5,
    "reviews": 120,
    "price": 29.99,
    "category": "Puzzle Games",
    "ageGroup": "3-5 Years",
    "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 6,
    "name": "Sport Car (RC)",
    "rating": 5,
    "reviews": 120,
    "price": 29.99,
    "category": "Remote Control",
    "ageGroup": "9-12 Years",
    "image": "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 7,
    "name": "Dinosaur World Set",
    "price": 27.99,
    "category": "Educational Toys",
    "ageGroup": "3-5 Years",
    "image": "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 8,
    "name": "Musical Drum Set",
    "price": 21.99,
    "category": "Outdoor Toys",
    "ageGroup": "6-8 Years",
    "image": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 9,
    "name": "Baby Activity Walker",
    "price": 27.99,
    "category": "Baby Toys",
    "ageGroup": "0-2 Years",
    "image": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 10,
    "name": "Princess Castle Playset",
    "price": 27.99,
    "category": "Puzzle Games",
    "ageGroup": "3-5 Years",
    "image": "https://m.media-amazon.com/images/I/71IfOxkxLnL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "id": 11,
    "name": "Giant Panda Plush",
    "price": 19.99,
    "category": "Soft Toys",
    "ageGroup": "0-2 Years",
    "rating": 4.8,
    "reviews": 210,
    "image": "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 12,
    "name": "Fluffy Bunny",
    "price": 14.99,
    "category": "Soft Toys",
    "ageGroup": "0-2 Years",
    "rating": 4.9,
    "reviews": 185,
    "image": "https://images.unsplash.com/photo-1582213709320-c20e5d9c7929?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 13,
    "name": "Wooden Train Set",
    "price": 34.99,
    "category": "Educational Toys",
    "ageGroup": "3-5 Years",
    "rating": 4.7,
    "reviews": 320,
    "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 14,
    "name": "RC Helicopter",
    "price": 45.00,
    "category": "Remote Control",
    "ageGroup": "9-12 Years",
    "rating": 4.5,
    "reviews": 90,
    "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 15,
    "name": "Superhero Action Figure",
    "price": 12.99,
    "category": "Action Figures",
    "ageGroup": "6-8 Years",
    "rating": 4.6,
    "reviews": 150,
    "image": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 16,
    "name": "Play Dough Kit",
    "price": 15.99,
    "category": "Educational Toys",
    "ageGroup": "3-5 Years",
    "rating": 4.8,
    "reviews": 400,
    "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 17,
    "name": "Jigsaw Puzzle 500pc",
    "price": 18.99,
    "category": "Puzzle Games",
    "ageGroup": "9-12 Years",
    "rating": 4.4,
    "reviews": 75,
    "image": "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 18,
    "name": "Water Gun Super",
    "price": 9.99,
    "category": "Outdoor Toys",
    "ageGroup": "6-8 Years",
    "rating": 4.5,
    "reviews": 110,
    "image": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 19,
    "name": "Snuggly Koala",
    "price": 21.99,
    "category": "Soft Toys",
    "ageGroup": "0-2 Years",
    "rating": 4.9,
    "reviews": 220,
    "image": "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 20,
    "name": "Interactive Globe",
    "price": 39.99,
    "category": "Educational Toys",
    "ageGroup": "6-8 Years",
    "rating": 4.7,
    "reviews": 130,
    "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 21,
    "name": "Robot Dog",
    "price": 49.99,
    "category": "Action Figures",
    "ageGroup": "6-8 Years",
    "rating": 4.6,
    "reviews": 85,
    "image": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 22,
    "name": "Baby Rattle Set",
    "price": 7.99,
    "category": "Baby Toys",
    "ageGroup": "0-2 Years",
    "rating": 4.8,
    "reviews": 310,
    "image": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 23,
    "name": "Rainbow Kite",
    "price": 12.00,
    "category": "Outdoor Toys",
    "ageGroup": "9-12 Years",
    "rating": 4.3,
    "reviews": 50,
    "image": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 24,
    "name": "Plush Elephant",
    "price": 24.99,
    "category": "Soft Toys",
    "ageGroup": "0-2 Years",
    "rating": 4.9,
    "reviews": 275,
    "image": "https://images.unsplash.com/photo-1582213709320-c20e5d9c7929?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 25,
    "name": "Chemistry Science Kit",
    "price": 29.99,
    "category": "Educational Toys",
    "ageGroup": "9-12 Years",
    "rating": 4.8,
    "reviews": 140,
    "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 26,
    "name": "Family Board Game Set",
    "price": 22.99,
    "category": "Puzzle Games",
    "ageGroup": "6-8 Years",
    "rating": 4.7,
    "reviews": 420,
    "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 27,
    "name": "RC Speed Boat",
    "price": 35.00,
    "category": "Remote Control",
    "ageGroup": "9-12 Years",
    "rating": 4.4,
    "reviews": 95,
    "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 28,
    "name": "Knight Action Figure",
    "price": 14.99,
    "category": "Action Figures",
    "ageGroup": "6-8 Years",
    "rating": 4.5,
    "reviews": 105,
    "image": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=300&q=80"
  },
  {
    "id": 29,
    "name": "Colorful Stacking Rings",
    "price": 10.99,
    "category": "Baby Toys",
    "ageGroup": "0-2 Years",
    "rating": 4.8,
    "reviews": 380,
    "image": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": 30,
    "name": "Giant Brown Teddy Bear",
    "price": 59.99,
    "category": "Soft Toys",
    "ageGroup": "3-5 Years",
    "rating": 4.9,
    "reviews": 540,
    "image": "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=300&q=80"
  }
]

def populate():
    print("Creating Superuser...")
    if not CustomUser.objects.filter(email="root@gmail.com").exists():
        CustomUser.objects.create_superuser("root@gmail.com", "root")
        print("Superuser root@gmail.com created!")
    else:
        print("Superuser already exists.")

    print("Populating Products...")
    for p in products_data:
        Product.objects.update_or_create(
            name=p['name'],
            defaults={
                'price': p['price'],
                'image': p.get('image', ''),
                'rating': p.get('rating', 0),
                'reviews': p.get('reviews', 0),
                'description': f"High quality {p['name']} for all ages.",
                'category': p.get('category', ''),
                'ageGroup': p.get('ageGroup', '')
            }
        )
    print("Products populated successfully!")

if __name__ == '__main__':
    populate()
