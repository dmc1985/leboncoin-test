# Desktop demo:

https://github.com/dmc1985/leboncoin-test/assets/25933535/21b017c8-b709-4be7-903d-6762df93025e

# Mobile demo:


https://github.com/dmc1985/leboncoin-test/assets/25933535/78e54c3f-8ae0-48a0-b6cc-9408b2f404c2


# My thought process:

In order to accomplish the exercise, the first step was to have a basic working display of the conversations where each one links to a page that
displays the messages of that conversation. For the styling, I used styled-components because I strongly prefer for the JSX to contain no references to 
CSS as this makes the code more difficult to read. It also makes the JSX much more declarative because instead of seeing generic html tags, 
each element has an explicit name such as "InfoContainer" or "DateText". To avoid the flicker caused by the props loading before the styling, I
had to add a _document.js file to the pages folder.

To separate the logic for data fetching from the display, all data fetching and formatting occurs in the components in the pages directory
while all the display logic belongs in the components directory. The majority of the fetching logic is in getServerSideProps(),
but I also needed to handle the refreshing of data on the client side to show new messages once they were sent. The only formatting of data that occurs
in the components is the formatting of dates since this is a display issue that is largely dependent on the user's timezone and language.

Once I had a basic, working display of conversations and messages, I implemented the sending of messages. A small feature that I added to improve
accessibility is to enable new message to be sent either by clicking the arrow button or pressing the enter key.

After the messages could be sent, the new message must become visible by programmatically scrolling to the bottom of the container.
As soon as the key functionality was complete, I went back and improved the styling to ensure it was correct for both desktop and mobile based on the screens provided.

To address security concerns, I put all the fetching of data in getServerSideProps since this is safer than client-side fetching. 
When fetching data, I make a check that the user is authenticated (i.e. the userId is truthy), and I redirect to a login page if it is falsy. 
For the conversation detail page, I check that the user has the right to view a given conversation by seeing if they are either the recipient or the sender.
If the user is neither, then they are not permitted to view that conversation.

I added basic tests for the two main pages using react-testing-library. Although my tests are by no means complete, I wanted to ensure that the essential 
information is displayed and the key user actions are covered by the tests.

I spent ~5 hours on this time because I wanted to deliver something complete, but I had a few issues with json-server which slowed me: 
1. When I called the conversation/:id route, the middleware for sending all conversations by userId was intercepting those calls and returning an empty array. 
I had to modify the middleware to only handle requests with a request.query.senderId.
2. After sending a new message, the lastMessageTimestamp of the relevant conversation has to be updated. This requires a patch request, but json-server 
was always returning 404. I finally realized it was because patch requests only work with routes with path params and not query params.
3. Even though the conversation's lastMessageTimestamp is updated correctly, the conversation list does not update the date because the data in the middleware
is always stale. I found that the db import in the middleware is stuck at the moment the server is launched and does not take new information into account.
I could not bear to turn in this test with a glaring bug like that. I tried to find a way to write data to the json in the middleware, but in the interest of time management,
I decided to just fetch each conversation independently to get the latest timestamp. This is obviously a very inefficient way to do this, but I
wanted it to work.

3 small improvements I would make:
1. Regarding showing new messages sent by the other person, I recognize that a chat app like this would most likely use a Web socket architecture rather 
than a REST API. However, in the current configuration, there needs to be some sort of polling mechanism that ensures that messages sent by the other user 
would be fetched in regular intervals. 
2. Use environment variables for the api domain rather than hardcoding "http://localhost:3005"
3. Using a theme rather than putting uncoordinated colors and sizes for the styling. 


# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercise :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

### Sketches :

Obvisouly, it is up to you to make something nice and pretty, you are free to design it the way you like. The sketches are here to give you an idea on how it should look.

<details>
  <summary>Click to see the sketches</summary>
  
Mobile list :

![](./sketches/list-mobile.jpg)

Desktop list :

![](./sketches/list-desktop.jpg)

Mobile conversation :

![](./sketches/conv-mobile.jpg)

Desktop conversation :

![](./sketches/conv-desktop.jpg)

</details>

### API :

You can find the API swagger file in `docs/api-swagger.yaml`.

For a better readibility, you can view it on [https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).

---

## Bonus 1 :

We provide some conversation samples, but can you improve the app so the user can now create new conversations ?

## Bonus 2 :

Our infrastructure is a bit shaky.. Sometimes the servers are crashing. “It’s not you, it’s me”, but maybe you can display something nice to warn the user and handle it gracefully.

## Do you want to make the app even better ?

Feel free to make as many improvements as you like.
We love creativity and technical challenges.

If you are out of ideas, here are some thoughts :

- As we want to reach our users anywhere, we need to make sure the app is performing well. What can you do to make it really fast ?

- Our goal is to support everybody in the country, including people with disabilities. As a good citizen and a good developer, can you make sure the app is accessible for everyone ?

- We all love to relax after a hard day’s work. It would be a shame if we didn’t feel confident enough about the upcoming automatic deployment. Are you sure everything has been tested thoroughly ?
