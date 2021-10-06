# **MODULE 4**

# **LEADERBOARD COMPONENT**

All caught up till now? Great. 

Let’s now build a quick and easy scoreboard. 

Let’s make it simple by breaking down our problem.

We need: 

- A record of individual player names and their scores

- Individual player ranks 

- A symbol to identify whose turn it is.

 So let’s start by creating an independent React component say ```leaderboard.jsx```

      We’ll start by creating a simple component, that utilises props to get ```users``` details 

      Now mapping through each ```user``` render individual user’s name and points to the dom. 

      Moving to the backend folder add a increaseScore method to ```user.js``` file which increments the score of the player who guessed it right. 
```user.points —> user.points+10```

In the eventHandlers file call the ```increaseScore``` function in the message event where we check if the incoming message matches the correct word or not.

For the frontend part you can display the players’ details in a ```<div>``` tag and style according to your own choice.

Lastly add any icon beside the user that shows whose turn it is. 

Keep changing the icon position according to turn

Not that complicated right? 

That’s all we had to do! There you have it! A functional skribbl clone, use it to play with your team when bored :)! 

You can now add features like -

kickout : For this create a button and on click emit an event votekick that lets other users vote for the the chosen user if 
```javascript
(kickVotes >= voteRequirement)
``` 
where ```voteRequirement``` is half of total 
```users```
 timer :
 ```javascript
 const Timer: React.FC<TimerProps> = ({ roundTime }) => {
  const [time, setTime] = React.useState(
    roundTime.timeToComplete + roundTime.startTime - Date.now()
  ); 
  ```
 
You can also add other features to it and innovate it as you like.
