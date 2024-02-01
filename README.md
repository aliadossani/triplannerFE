# WanderBasket

## Description

WanderBasket is an app to make grocery shopping easier when you plan a vacation with many people involved. The user can create trips, to which they add participants. All the trip participants can then access the trip's details, and add/remove/edit a grocery list. When the list is ready, the user can print the shopping list in one click.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Logged Out Homepage:** As an anon/user I can see a homepage that describes the WanderBasket app and invites me to signup
-  **Signup:** As an anon I can sign up in the platform so that I can start creating, reading and editing trips and related groceries
-  **Login:** As a user I can login to the platform so that I can see my trips, add new ones, edit trips, add grocery items,etc.
-  **Logout:** As a user I can logout from the platform 
-  **All Trips** As a user I can see a list of all the trips I created or was added to
-  **Search Trip** As a user I can search trips by name or destination to see more details about them
-  **Add Trip** As a user I can add a new trip
-  **Edit Trip** As a user I can edit an existing trip
-  **Delete Trip** As the creator of the trip I can delete an existing trip
-  **Add groceries** As a participant to a trip, I can add grocery items to it
-  **Edit groceries** As a participant to a trip, I can edit existing grocery items
-  **Delete groceries** As the creator of the grocery item, I can delete it
-  **Print shopping list** As a participant to a trip, I can print the list of groceries that were tagged as "needs to be purchased"
-  **Chatbot** As an anon/user I can communicate with a chatbot that will guide me through the app's features
-  **User Profile** As a user I can modify my user name, picture or email address. I can also see the list of trips I take part in
-  **About** As a anon/user, I can learn more about the creators of the app

## Backlog

Chatbot:
- enrich the possible scenarii the chatbot handles

Tagging participants:
- make it possible to tag participants on groceries list, so they are designated responsible of a specific item

Comments:
- make it possible for participants to leave comments on each trip

# Client / Fronted

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /trips - trips list
- /trips/:tripId - trip's details
- /trips/:tripId/update - edit trip's details
- /trips/:tripId/shoppinglist - print shopping list
- /trips/new - create a new trip
- /user/:userId/update - update user profile
- /about - info about the creators
- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Trips List Page (user only)
- Create Trip Page (user only)
- Update Trip Page (user only)
- Shopping List Page (user only)
- Trip Details Page (user only)
- User Profile Page (user only)
- 404 Page (public)

## Components

- Authform 
- ChangeGrocery
- Footer
- GroceryList
- Loader
- Navbar
- ParticipantList
- PrivateRoute
- Search

## Links

### Trello/Kanban

[Trello board](https://trello.com/b/vUanONZ8/trip-planner)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/aliadossani/triplannerFE)
[Server repository Link](https://github.com/emi-fto/Trip-Planner---Module-3-Project-Back-End-)

[Deploy Link](https://mellifluous-marzipan-31783e.netlify.app/)

### Slides

[Slides Link](https://pitch.com/v/wanderbasket-your-ultimate-tavel-grocery-companion-xgytz9)