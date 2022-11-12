import { useParams } from "react-router-dom";

const BlogPage = () => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id === Number(id));
  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>
        has {anecdote.votes} votes
        <br />
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};
