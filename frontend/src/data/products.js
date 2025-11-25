export const allProducts = [
    // --- ELECTRONICS (20+ items) ---
    // Headphones
    { id: 1, name: 'Headphones', price: 299, category: 'electronics', image: 'https://via.placeholder.com/300/667eea/ffffff?text=Headphones' },
    { id: 101, name: 'Sony WH-1000XM5 Headphones', price: 348, category: 'electronics', image: 'https://via.placeholder.com/300/000000/ffffff?text=Sony+XM5' },
    { id: 102, name: 'Bose QuietComfort 45 Headphones', price: 329, category: 'electronics', image: 'https://via.placeholder.com/300/333333/ffffff?text=Bose+QC45' },
    { id: 103, name: 'Beats Studio3 Wireless Headphones', price: 199, category: 'electronics', image: 'https://via.placeholder.com/300/990000/ffffff?text=Beats+Studio3' },
    { id: 104, name: 'Sennheiser Momentum 4 Headphones', price: 299, category: 'electronics', image: 'https://via.placeholder.com/300/444444/ffffff?text=Sennheiser' },
    { id: 105, name: 'Audio-Technica ATH-M50x', price: 149, category: 'electronics', image: 'https://via.placeholder.com/300/111111/ffffff?text=Audio-Technica' },
    // Smart Watches
    { id: 2, name: 'Smart Watch', price: 249, category: 'electronics', image: 'https://via.placeholder.com/300/764ba2/ffffff?text=Smart+Watch' },
    { id: 201, name: 'Apple Watch Series 9', price: 399, category: 'electronics', image: 'https://via.placeholder.com/300/000000/ffffff?text=Apple+Watch' },
    { id: 202, name: 'Samsung Galaxy Watch 6', price: 299, category: 'electronics', image: 'https://via.placeholder.com/300/111111/ffffff?text=Galaxy+Watch' },
    { id: 203, name: 'Garmin Venu 3 Smart Watch', price: 449, category: 'electronics', image: 'https://via.placeholder.com/300/222222/ffffff?text=Garmin+Venu' },
    { id: 204, name: 'Fitbit Charge 6', price: 159, category: 'electronics', image: 'https://via.placeholder.com/300/333333/ffffff?text=Fitbit' },
    // Keyboards
    { id: 3, name: 'Keyboard', price: 129, category: 'electronics', image: 'https://via.placeholder.com/300/f093fb/ffffff?text=Keyboard' },
    { id: 301, name: 'Keychron K2 Mechanical Keyboard', price: 79, category: 'electronics', image: 'https://via.placeholder.com/300/333333/ffffff?text=Keychron+K2' },
    { id: 302, name: 'Logitech MX Keys Keyboard', price: 119, category: 'electronics', image: 'https://via.placeholder.com/300/444444/ffffff?text=Logitech+MX' },
    { id: 303, name: 'Razer BlackWidow V4 Keyboard', price: 169, category: 'electronics', image: 'https://via.placeholder.com/300/00ff00/ffffff?text=Razer+BlackWidow' },
    { id: 304, name: 'Corsair K70 RGB Keyboard', price: 159, category: 'electronics', image: 'https://via.placeholder.com/300/111111/ffffff?text=Corsair+K70' },
    // Mice
    { id: 4, name: 'Mouse', price: 49, category: 'electronics', image: 'https://via.placeholder.com/300/3b82f6/ffffff?text=Mouse' },
    { id: 401, name: 'Logitech MX Master 3S Mouse', price: 99, category: 'electronics', image: 'https://via.placeholder.com/300/333333/ffffff?text=MX+Master+3S' },
    { id: 402, name: 'Razer DeathAdder V3 Mouse', price: 69, category: 'electronics', image: 'https://via.placeholder.com/300/00ff00/ffffff?text=DeathAdder' },
    { id: 403, name: 'Apple Magic Mouse', price: 79, category: 'electronics', image: 'https://via.placeholder.com/300/ffffff/000000?text=Magic+Mouse' },
    { id: 404, name: 'SteelSeries Aerox 3 Mouse', price: 59, category: 'electronics', image: 'https://via.placeholder.com/300/222222/ffffff?text=SteelSeries' },
    // Speakers
    { id: 5, name: 'Speaker', price: 129, category: 'electronics', image: 'https://via.placeholder.com/300/8b5cf6/ffffff?text=Speaker' },
    { id: 501, name: 'JBL Flip 6 Speaker', price: 129, category: 'electronics', image: 'https://via.placeholder.com/300/ff4400/ffffff?text=JBL+Flip+6' },
    { id: 502, name: 'Marshall Emberton II Speaker', price: 169, category: 'electronics', image: 'https://via.placeholder.com/300/000000/ffffff?text=Marshall' },
    { id: 503, name: 'Sonos Roam Speaker', price: 179, category: 'electronics', image: 'https://via.placeholder.com/300/ffffff/000000?text=Sonos+Roam' },
    { id: 504, name: 'Bose SoundLink Flex Speaker', price: 149, category: 'electronics', image: 'https://via.placeholder.com/300/333333/ffffff?text=Bose+SoundLink' },
    { id: 505, name: 'Ultimate Ears Wonderboom 3', price: 99, category: 'electronics', image: 'https://via.placeholder.com/300/0000ff/ffffff?text=UE+Wonderboom' },
    // Gaming Headsets
    { id: 6, name: 'Gaming Headset', price: 89, category: 'electronics', image: 'https://via.placeholder.com/300/ec4899/ffffff?text=Headset' },
    { id: 601, name: 'HyperX Cloud II Headset', price: 99, category: 'electronics', image: 'https://via.placeholder.com/300/ff0000/ffffff?text=HyperX' },
    { id: 602, name: 'SteelSeries Arctis 7 Headset', price: 149, category: 'electronics', image: 'https://via.placeholder.com/300/333333/ffffff?text=Arctis+7' },

    // --- SUMMER COLLECTION (20+ items) ---
    // Dresses
    { id: 7, name: 'Summer Dress', price: 59, category: 'summer', image: 'https://via.placeholder.com/300/f472b6/ffffff?text=Summer+Dress' },
    { id: 701, name: 'Floral Maxi Summer Dress', price: 79, category: 'summer', image: 'https://via.placeholder.com/300/ff99cc/ffffff?text=Floral+Maxi' },
    { id: 702, name: 'Boho Mini Summer Dress', price: 49, category: 'summer', image: 'https://via.placeholder.com/300/ffcc99/ffffff?text=Boho+Mini' },
    { id: 703, name: 'White Lace Sundress', price: 89, category: 'summer', image: 'https://via.placeholder.com/300/ffffff/000000?text=Lace+Sundress' },
    { id: 704, name: 'Polka Dot Wrap Dress', price: 69, category: 'summer', image: 'https://via.placeholder.com/300/ff6666/ffffff?text=Polka+Dot' },
    // Shirts
    { id: 8, name: 'Linen Shirt', price: 45, category: 'summer', image: 'https://via.placeholder.com/300/fde047/ffffff?text=Linen+Shirt' },
    { id: 801, name: 'White Linen Shirt', price: 45, category: 'summer', image: 'https://via.placeholder.com/300/ffffff/000000?text=White+Linen' },
    { id: 802, name: 'Blue Striped Linen Shirt', price: 49, category: 'summer', image: 'https://via.placeholder.com/300/99ccff/ffffff?text=Blue+Striped' },
    { id: 803, name: 'Pink Cotton Shirt', price: 39, category: 'summer', image: 'https://via.placeholder.com/300/ffcccc/000000?text=Pink+Cotton' },
    { id: 804, name: 'Tropical Print Shirt', price: 55, category: 'summer', image: 'https://via.placeholder.com/300/00cc99/ffffff?text=Tropical' },
    // Shorts
    { id: 9, name: 'Beach Shorts', price: 35, category: 'summer', image: 'https://via.placeholder.com/300/60a5fa/ffffff?text=Shorts' },
    { id: 901, name: 'Denim Shorts', price: 45, category: 'summer', image: 'https://via.placeholder.com/300/3366cc/ffffff?text=Denim+Shorts' },
    { id: 902, name: 'Khaki Cargo Shorts', price: 39, category: 'summer', image: 'https://via.placeholder.com/300/cccc99/ffffff?text=Khaki+Shorts' },
    { id: 903, name: 'Athletic Running Shorts', price: 29, category: 'summer', image: 'https://via.placeholder.com/300/000000/ffffff?text=Running+Shorts' },
    { id: 904, name: 'Swim Trunks', price: 35, category: 'summer', image: 'https://via.placeholder.com/300/0099ff/ffffff?text=Swim+Trunks' },
    // Hats

    { id: 1002, name: 'Bucket Hat', price: 22, category: 'summer', image: 'https://via.placeholder.com/300/ffffff/000000?text=Bucket+Hat' },
    { id: 1003, name: 'Baseball Cap', price: 19, category: 'summer', image: 'https://via.placeholder.com/300/000000/ffffff?text=Cap' },
    // Sandals
    { id: 11, name: 'Sandals', price: 40, category: 'summer', image: 'https://via.placeholder.com/300/a8a29e/ffffff?text=Sandals' },
    { id: 1101, name: 'Leather Slide Sandals', price: 55, category: 'summer', image: 'https://via.placeholder.com/300/663300/ffffff?text=Leather+Slides' },
    { id: 1102, name: 'Flip Flops', price: 15, category: 'summer', image: 'https://via.placeholder.com/300/000000/ffffff?text=Flip+Flops' },
    { id: 1103, name: 'Espadrilles', price: 45, category: 'summer', image: 'https://via.placeholder.com/300/cccc99/ffffff?text=Espadrilles' },

    // --- WINTER COLLECTION (20+ items) ---
    // Coats
    { id: 12, name: 'Wool Coat', price: 199, category: 'winter', image: 'https://via.placeholder.com/300/374151/ffffff?text=Wool+Coat' },
    { id: 1201, name: 'Long Black Wool Coat', price: 249, category: 'winter', image: 'https://via.placeholder.com/300/000000/ffffff?text=Black+Coat' },
    { id: 1202, name: 'Camel Wool Coat', price: 229, category: 'winter', image: 'https://via.placeholder.com/300/cc9966/ffffff?text=Camel+Coat' },
    { id: 1203, name: 'Grey Trench Coat', price: 189, category: 'winter', image: 'https://via.placeholder.com/300/666666/ffffff?text=Grey+Trench' },
    { id: 1204, name: 'Navy Peacoat', price: 219, category: 'winter', image: 'https://via.placeholder.com/300/000066/ffffff?text=Navy+Peacoat' },
    // Scarves
    { id: 13, name: 'Cashmere Scarf', price: 89, category: 'winter', image: 'https://via.placeholder.com/300/9ca3af/ffffff?text=Scarf' },
    { id: 1301, name: 'Red Plaid Scarf', price: 45, category: 'winter', image: 'https://via.placeholder.com/300/cc0000/ffffff?text=Plaid+Scarf' },
    { id: 1302, name: 'Grey Knit Scarf', price: 35, category: 'winter', image: 'https://via.placeholder.com/300/999999/ffffff?text=Knit+Scarf' },
    { id: 1303, name: 'Silk Scarf', price: 65, category: 'winter', image: 'https://via.placeholder.com/300/ccccff/000000?text=Silk+Scarf' },
    // Gloves
    { id: 14, name: 'Leather Gloves', price: 59, category: 'winter', image: 'https://via.placeholder.com/300/4b5563/ffffff?text=Gloves' },
    { id: 1401, name: 'Black Leather Gloves', price: 65, category: 'winter', image: 'https://via.placeholder.com/300/000000/ffffff?text=Black+Gloves' },
    { id: 1402, name: 'Brown Leather Gloves', price: 65, category: 'winter', image: 'https://via.placeholder.com/300/663300/ffffff?text=Brown+Gloves' },
    { id: 1403, name: 'Wool Mittens', price: 29, category: 'winter', image: 'https://via.placeholder.com/300/ffffff/000000?text=Mittens' },
    // Boots
    { id: 15, name: 'Winter Boots', price: 149, category: 'winter', image: 'https://via.placeholder.com/300/1f2937/ffffff?text=Boots' },
    { id: 1501, name: 'Snow Boots', price: 129, category: 'winter', image: 'https://via.placeholder.com/300/999999/ffffff?text=Snow+Boots' },
    { id: 1502, name: 'Leather Chelsea Boots', price: 159, category: 'winter', image: 'https://via.placeholder.com/300/333333/ffffff?text=Chelsea+Boots' },
    { id: 1503, name: 'Hiking Boots', price: 139, category: 'winter', image: 'https://via.placeholder.com/300/663300/ffffff?text=Hiking+Boots' },
    // Jackets
    { id: 16, name: 'Puffer Jacket', price: 129, category: 'winter', image: 'https://via.placeholder.com/300/6b7280/ffffff?text=Puffer' },
    { id: 1601, name: 'Down Puffer Jacket', price: 199, category: 'winter', image: 'https://via.placeholder.com/300/000000/ffffff?text=Down+Jacket' },
    { id: 1602, name: 'Parka Jacket', price: 249, category: 'winter', image: 'https://via.placeholder.com/300/003300/ffffff?text=Parka' },
    { id: 1603, name: 'Fleece Jacket', price: 89, category: 'winter', image: 'https://via.placeholder.com/300/333333/ffffff?text=Fleece' },

    // --- WOODEN COLLECTION (20+ items) ---
    // Tables
    { id: 17, name: 'Coffee Table', price: 299, category: 'wood', image: 'https://via.placeholder.com/300/78350f/ffffff?text=Coffee+Table' },
    { id: 1701, name: 'Oak Coffee Table', price: 299, category: 'wood', image: 'https://via.placeholder.com/300/996633/ffffff?text=Oak+Table' },
    { id: 1702, name: 'Walnut Coffee Table', price: 349, category: 'wood', image: 'https://via.placeholder.com/300/663300/ffffff?text=Walnut+Table' },
    { id: 1703, name: 'Rustic Pine Table', price: 249, category: 'wood', image: 'https://via.placeholder.com/300/cc9966/ffffff?text=Pine+Table' },
    { id: 1704, name: 'Round Side Table', price: 129, category: 'wood', image: 'https://via.placeholder.com/300/996633/ffffff?text=Side+Table' },
    // Clocks
    { id: 18, name: 'Wooden Wall Clock', price: 79, category: 'wood', image: 'https://via.placeholder.com/300/92400e/ffffff?text=Wall+Clock' },
    { id: 1801, name: 'Modern Minimalist Clock', price: 89, category: 'wood', image: 'https://via.placeholder.com/300/ffffff/000000?text=Minimal+Clock' },
    { id: 1802, name: 'Vintage Cuckoo Clock', price: 199, category: 'wood', image: 'https://via.placeholder.com/300/663300/ffffff?text=Cuckoo+Clock' },
    { id: 1803, name: 'Desk Clock', price: 49, category: 'wood', image: 'https://via.placeholder.com/300/cc9966/ffffff?text=Desk+Clock' },
    // Bowls
    { id: 19, name: 'Handcarved Bowl', price: 49, category: 'wood', image: 'https://via.placeholder.com/300/b45309/ffffff?text=Bowl' },
    { id: 1901, name: 'Large Salad Bowl', price: 69, category: 'wood', image: 'https://via.placeholder.com/300/996633/ffffff?text=Salad+Bowl' },
    { id: 1902, name: 'Fruit Bowl Set', price: 89, category: 'wood', image: 'https://via.placeholder.com/300/cc9966/ffffff?text=Fruit+Bowl' },
    { id: 1903, name: 'Decorative Teak Bowl', price: 59, category: 'wood', image: 'https://via.placeholder.com/300/663300/ffffff?text=Teak+Bowl' },
    // Utensils
    { id: 20, name: 'Bamboo Utensils', price: 29, category: 'wood', image: 'https://via.placeholder.com/300/d97706/ffffff?text=Utensils' },
    { id: 2001, name: 'Cooking Spoon Set', price: 35, category: 'wood', image: 'https://via.placeholder.com/300/cc9966/ffffff?text=Spoons' },
    { id: 2002, name: 'Wooden Cutting Board', price: 45, category: 'wood', image: 'https://via.placeholder.com/300/996633/ffffff?text=Cutting+Board' },
    { id: 2003, name: 'Serving Tray', price: 55, category: 'wood', image: 'https://via.placeholder.com/300/663300/ffffff?text=Tray' },
    // Frames
    { id: 21, name: 'Wooden Picture Frame', price: 39, category: 'wood', image: 'https://via.placeholder.com/300/f59e0b/ffffff?text=Frame' },
    { id: 2101, name: 'Set of 3 Frames', price: 89, category: 'wood', image: 'https://via.placeholder.com/300/996633/ffffff?text=3+Frames' },
    { id: 2102, name: 'Rustic Photo Frame', price: 35, category: 'wood', image: 'https://via.placeholder.com/300/cc9966/ffffff?text=Rustic+Frame' },
    { id: 2103, name: 'Large Wall Frame', price: 69, category: 'wood', image: 'https://via.placeholder.com/300/663300/ffffff?text=Wall+Frame' },

    // --- TOYS & GAMES (20+ items) ---
    // Lego
    { id: 22, name: 'Building Blocks', price: 49, category: 'toys', image: 'https://via.placeholder.com/300/ef4444/ffffff?text=Blocks' },
    { id: 2201, name: 'City Building Blocks Set', price: 59, category: 'toys', image: 'https://via.placeholder.com/300/ff0000/ffffff?text=City+Set' },
    { id: 2202, name: 'Space Building Blocks Set', price: 69, category: 'toys', image: 'https://via.placeholder.com/300/0000ff/ffffff?text=Space+Set' },
    { id: 2203, name: 'Castle Building Blocks', price: 79, category: 'toys', image: 'https://via.placeholder.com/300/999999/ffffff?text=Castle' },
    { id: 2204, name: 'Technic Car Model', price: 99, category: 'toys', image: 'https://via.placeholder.com/300/000000/ffffff?text=Technic+Car' },
    // Plush
    { id: 23, name: 'Plush Teddy Bear', price: 29, category: 'toys', image: 'https://via.placeholder.com/300/f87171/ffffff?text=Teddy' },
    { id: 2301, name: 'Giant Panda Plush', price: 49, category: 'toys', image: 'https://via.placeholder.com/300/ffffff/000000?text=Panda' },
    { id: 2302, name: 'Bunny Plush Toy', price: 25, category: 'toys', image: 'https://via.placeholder.com/300/ffcccc/ffffff?text=Bunny' },
    { id: 2303, name: 'Elephant Plush', price: 35, category: 'toys', image: 'https://via.placeholder.com/300/cccccc/000000?text=Elephant' },
    // RC Cars
    { id: 24, name: 'Remote Control Car', price: 89, category: 'toys', image: 'https://via.placeholder.com/300/dc2626/ffffff?text=RC+Car' },
    { id: 2401, name: 'Off-Road RC Truck', price: 129, category: 'toys', image: 'https://via.placeholder.com/300/333333/ffffff?text=Off-Road' },
    { id: 2402, name: 'High Speed RC Racer', price: 99, category: 'toys', image: 'https://via.placeholder.com/300/ff0000/ffffff?text=Racer' },
    { id: 2403, name: 'RC Drift Car', price: 79, category: 'toys', image: 'https://via.placeholder.com/300/0000ff/ffffff?text=Drift+Car' },
    // Puzzles
    { id: 25, name: 'Educational Puzzle', price: 25, category: 'toys', image: 'https://via.placeholder.com/300/b91c1c/ffffff?text=Puzzle' },
    { id: 2501, name: '1000 Piece Landscape Puzzle', price: 35, category: 'toys', image: 'https://via.placeholder.com/300/00cc00/ffffff?text=Landscape' },
    { id: 2502, name: '3D Wooden Puzzle', price: 45, category: 'toys', image: 'https://via.placeholder.com/300/996633/ffffff?text=3D+Puzzle' },
    { id: 2503, name: 'Map of the World Puzzle', price: 29, category: 'toys', image: 'https://via.placeholder.com/300/0000ff/ffffff?text=Map+Puzzle' },
    // Figures
    { id: 26, name: 'Action Figure', price: 35, category: 'toys', image: 'https://via.placeholder.com/300/991b1b/ffffff?text=Action+Figure' },
    { id: 2601, name: 'Superhero Action Figure', price: 29, category: 'toys', image: 'https://via.placeholder.com/300/ff0000/ffffff?text=Superhero' },
    { id: 2602, name: 'Robot Action Figure', price: 39, category: 'toys', image: 'https://via.placeholder.com/300/cccccc/000000?text=Robot' },
    { id: 2603, name: 'Dinosaur Figure', price: 25, category: 'toys', image: 'https://via.placeholder.com/300/003300/ffffff?text=Dinosaur' },

    // --- BOOKS (20+ items) ---
    // SciFi
    { id: 27, name: 'Sci-Fi Book', price: 24, category: 'books', image: 'https://via.placeholder.com/300/1e3a8a/ffffff?text=Sci-Fi' },
    { id: 2701, name: 'Dune Sci-Fi Book', price: 25, category: 'books', image: 'https://via.placeholder.com/300/cc9900/ffffff?text=Dune' },
    { id: 2702, name: 'The Martian Sci-Fi Book', price: 20, category: 'books', image: 'https://via.placeholder.com/300/ff3300/ffffff?text=The+Martian' },
    { id: 2703, name: 'Foundation Series', price: 45, category: 'books', image: 'https://via.placeholder.com/300/000066/ffffff?text=Foundation' },
    { id: 2704, name: 'Neuromancer', price: 22, category: 'books', image: 'https://via.placeholder.com/300/000000/ffffff?text=Neuromancer' },
    // Cookbooks
    { id: 28, name: 'Cookbook Masterclass', price: 39, category: 'books', image: 'https://via.placeholder.com/300/1e40af/ffffff?text=Cookbook' },
    { id: 2801, name: 'Italian Cooking', price: 35, category: 'books', image: 'https://via.placeholder.com/300/009900/ffffff?text=Italian' },
    { id: 2802, name: 'Vegan Recipes', price: 29, category: 'books', image: 'https://via.placeholder.com/300/00cc00/ffffff?text=Vegan' },
    { id: 2803, name: 'Baking Bible', price: 45, category: 'books', image: 'https://via.placeholder.com/300/ffcc99/ffffff?text=Baking' },
    // Art
    { id: 29, name: 'History of Art', price: 59, category: 'books', image: 'https://via.placeholder.com/300/1d4ed8/ffffff?text=Art+History' },
    { id: 2901, name: 'Modern Art Book', price: 49, category: 'books', image: 'https://via.placeholder.com/300/ff00ff/ffffff?text=Modern+Art' },
    { id: 2902, name: 'Photography Collection', price: 55, category: 'books', image: 'https://via.placeholder.com/300/000000/ffffff?text=Photography' },
    { id: 2903, name: 'Design Principles', price: 45, category: 'books', image: 'https://via.placeholder.com/300/cccccc/000000?text=Design' },
    // Self Help
    { id: 30, name: 'Self-Improvement', price: 19, category: 'books', image: 'https://via.placeholder.com/300/2563eb/ffffff?text=Self+Help' },
    { id: 3001, name: 'Atomic Habits', price: 25, category: 'books', image: 'https://via.placeholder.com/300/ffcc00/ffffff?text=Habits' },
    { id: 3002, name: 'Deep Work', price: 22, category: 'books', image: 'https://via.placeholder.com/300/000099/ffffff?text=Deep+Work' },
    { id: 3003, name: 'Mindset', price: 20, category: 'books', image: 'https://via.placeholder.com/300/0099ff/ffffff?text=Mindset' },
    // Mystery
    { id: 31, name: 'Mystery Novel', price: 22, category: 'books', image: 'https://via.placeholder.com/300/3b82f6/ffffff?text=Mystery' },
    { id: 3101, name: 'Sherlock Holmes Collection', price: 35, category: 'books', image: 'https://via.placeholder.com/300/333333/ffffff?text=Sherlock' },
    { id: 3102, name: 'Gone Girl', price: 19, category: 'books', image: 'https://via.placeholder.com/300/000000/ffffff?text=Gone+Girl' },
    { id: 3103, name: 'The Da Vinci Code', price: 24, category: 'books', image: 'https://via.placeholder.com/300/990000/ffffff?text=Da+Vinci' },

    // --- KITCHEN APPLIANCES (20+ items) ---
    // Coffee
    { id: 32, name: 'Espresso Machine', price: 199, category: 'kitchen', image: 'https://via.placeholder.com/300/4b5563/ffffff?text=Espresso' },
    { id: 3201, name: 'Breville Espresso Machine', price: 699, category: 'kitchen', image: 'https://via.placeholder.com/300/cccccc/000000?text=Breville' },
    { id: 3202, name: 'DeLonghi Espresso Machine', price: 299, category: 'kitchen', image: 'https://via.placeholder.com/300/333333/ffffff?text=DeLonghi' },
    { id: 3203, name: 'Nespresso Vertuo', price: 179, category: 'kitchen', image: 'https://via.placeholder.com/300/000000/ffffff?text=Nespresso' },
    { id: 3204, name: 'French Press', price: 39, category: 'kitchen', image: 'https://via.placeholder.com/300/996633/ffffff?text=French+Press' },
    // Blenders
    { id: 33, name: 'Smart Blender', price: 129, category: 'kitchen', image: 'https://via.placeholder.com/300/6b7280/ffffff?text=Blender' },
    { id: 3301, name: 'Vitamix Blender', price: 499, category: 'kitchen', image: 'https://via.placeholder.com/300/000000/ffffff?text=Vitamix' },
    { id: 3302, name: 'Ninja Professional Blender', price: 99, category: 'kitchen', image: 'https://via.placeholder.com/300/333333/ffffff?text=Ninja' },
    { id: 3303, name: 'NutriBullet', price: 79, category: 'kitchen', image: 'https://via.placeholder.com/300/666666/ffffff?text=NutriBullet' },
    // Air Fryers
    { id: 34, name: 'Air Fryer', price: 149, category: 'kitchen', image: 'https://via.placeholder.com/300/9ca3af/ffffff?text=Air+Fryer' },
    { id: 3401, name: 'Ninja Air Fryer', price: 129, category: 'kitchen', image: 'https://via.placeholder.com/300/333333/ffffff?text=Ninja+Fryer' },
    { id: 3402, name: 'Philips Air Fryer XXL', price: 299, category: 'kitchen', image: 'https://via.placeholder.com/300/000000/ffffff?text=Philips+XXL' },
    { id: 3403, name: 'Instant Pot Vortex', price: 119, category: 'kitchen', image: 'https://via.placeholder.com/300/cccccc/000000?text=Instant+Vortex' },
    // Toasters
    { id: 35, name: 'Toaster Oven', price: 89, category: 'kitchen', image: 'https://via.placeholder.com/300/d1d5db/ffffff?text=Toaster' },
    { id: 3501, name: 'Breville Smart Oven', price: 249, category: 'kitchen', image: 'https://via.placeholder.com/300/cccccc/000000?text=Smart+Oven' },
    { id: 3502, name: 'Cuisinart Toaster Oven', price: 159, category: 'kitchen', image: 'https://via.placeholder.com/300/999999/ffffff?text=Cuisinart' },
    { id: 3503, name: '4-Slice Toaster', price: 59, category: 'kitchen', image: 'https://via.placeholder.com/300/ffffff/000000?text=4-Slice' },
    // Kettles
    { id: 36, name: 'Electric Kettle', price: 49, category: 'kitchen', image: 'https://via.placeholder.com/300/e5e7eb/ffffff?text=Kettle' },
    { id: 3601, name: 'Smeg Electric Kettle', price: 169, category: 'kitchen', image: 'https://via.placeholder.com/300/ffcccc/ffffff?text=Smeg' },
    { id: 3602, name: 'Gooseneck Kettle', price: 79, category: 'kitchen', image: 'https://via.placeholder.com/300/333333/ffffff?text=Gooseneck' },
    { id: 3603, name: 'Glass Electric Kettle', price: 39, category: 'kitchen', image: 'https://via.placeholder.com/300/ffffff/000000?text=Glass+Kettle' },
];
