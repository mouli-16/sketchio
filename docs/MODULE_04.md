# Sketchio ( MODULE 4 ) || [🎬](https://drive.google.com/file/d/1xYQ47o-jwG9GYsCFJFfBv6DFXvNc1di8/view?usp=sharing)

## Leaderboard component

All caught up till now? Great. 

Let’s now build a quick and easy scoreboard. 

Let’s make it simple by breaking down our problem.

We need: 

- A record of individual player names and their scores

- Individual player ranks 

- A symbol to identify whose turn it is.

So let’s start by creating an independent React component say `leaderboard.jsx`

We’ll start by creating a simple component, that utilises props to get `users` details. Now mapping through each `user` render individual user’s name and points to the dom like:
```javascript
{users.map(({ name, points }, i) => { ... } }
```

Moving to the backend folder add a increaseScore method to `user.js` file which increments the score of the player who guessed it right.

In increaseScore method increment the score of the user as shown:
`user.points —> user.points+10`

In the eventHandlers file call the `increaseScore` function in the `message` event where we check if the incoming message matches the correct word or not 

For the frontend part you can display the players’ details in a `<div>` tag and style according to your own choice.

Lastly add any icon beside the user that shows whose turn it is. 

Keep changing the icon position according to turn

Not that complicated right? 

That’s all we had to do! There you have it! A functional skribbl clone, use it to play with your team when bored :)! 

## Additional features (Innovation period)

You can now add the features you like, some of them that we would have think of are:

+ kickout : For this create a button and on click emit an event votekick that lets other users vote for the chosen user if
  ```javascript
  (kickVotes >= voteRequirement)
  ```
  where `voteRequirement` is half of total
  `users`
+ timer :
  ```javascript
  const Timer: React.FC<TimerProps> = ({ roundTime }) => {
  const [time, setTime] = React.useState(
    roundTime.timeToComplete + roundTime.startTime - Date.now()
  ); 
  ```

You can add various other features to it and innovate it as you like.
