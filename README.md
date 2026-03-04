Food Store Calculator API
A simple order pricing service built with NestJS that calculates the total price of menu items and applies promotional discounts.

This project demonstrates
- Clean architecture
- SOLID principles
- Strategy pattern for promotions
- DTO validation
- Dependency Injection
- Unit testing


Features
- Support 7 menu items
- Order multiple items per request
- Member discount
- Bundle promotion
- Input validation
- Unit tests

| Item   | Price   |
| ------ | ------- |
| RED    | 50 THB  |
| GREEN  | 40 THB  |
| BLUE   | 30 THB  |
| YELLOW | 50 THB  |
| PINK   | 80 THB  |
| PURPLE | 90 THB  |
| ORANGE | 120 THB |


Promotions

Member Promotion
Customers with a member card receive: 10% discount

Bundle Promotion
If a customer orders 2 or more of the following items:
ORANGE, PINK, GREEN
They receive: 5% discount

Project Structure
src
├── order
│   ├── controller
│   │   order.controller.ts
│   ├── services
│   │   order.service.ts
│   ├── dtos
│   │   create-order.dto.ts
│
├── domain
│   menu.enum.ts
│   menu-price.ts
│
├── promotions
│   promotion.interface.ts
│   bundle.promotion.ts
│   member.promotion.ts
│
├── app.module.ts
└── main.ts

Design Explanation

Controller
Handles HTTP requests.

Service
Contains business logic for price calculation.

DTO
Handles validation and request transformation.

Domain
Contains menu definitions and prices.

Promotions
Implemented using the Strategy Pattern so that new promotions can be added easily without modifying the main service.

This follows the Open/Closed Principle (SOLID).

Installation
npm install

Run Application
Development mode

npm run start:dev

Production build

npm run build
npm run start:prod

Server will run at:

http://localhost:3000
API
Calculate Order Price

POST

/orders/calculate

Request Example

{
  "items": [
    { "item": "RED", "quantity": 1 },
    { "item": "GREEN", "quantity": 1 }
  ],
  "isMember": true
}

Response Example

{
  "total": 81
}

Explanation:

RED = 50
GREEN = 40
Total = 90
Member discount (10%) = 9
Final = 81


Validation Rules
- items must be an array
- item must be a valid menu item
- quantity must be >= 1
- isMember must be boolean

Example invalid request:
- quantity = 0
- invalid menu item
- missing items field

Run Tests
npm run test

Run with coverage

npm run test:cov

Example Test Cases

Case 1

Order: RED + GREEN
Expected: 90

Case 2

Order: ORANGE x2
Expected:
240 - 5% = 228

Case 3

Order: PINK x2 + Member
Expected:
160 - 5% = 152
152 - 10% = 136.8


Technologies
- Node.js
- NestJS
- TypeScript
- class-validator
- class-transformer
- Jest

Design Principles Used

1. Single Responsibility Principle
Each class has only one responsibility:

- OrderService → price calculation
- Promotion classes → discount logic

2. Open / Closed Principle

New promotions can be added without modifying existing code.

Example:

- SeasonalPromotion
- HolidayPromotion
- FlashSalePromotion 

3. Dependency Injection

Promotions are injected into the service using NestJS DI container.

Author

Teerapat Saiprom
Software Engineer
