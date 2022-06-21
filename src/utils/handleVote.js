function handleVote(
  event,
  id,
  upVotedList,
  downVotedList,
  setUpvotedList,
  setDownvotedList,
  data,
  setData,
  patchFunction,
  isUpvote
) {
  const noVotes = !upVotedList.includes(id) && !downVotedList.includes(id);
  const upVoted = upVotedList.includes(id);
  const downVoted = downVotedList.includes(id);
  const addUpvoted = () => {
    setUpvotedList((upVotedList) => [...upVotedList, id]);
  };
  const removeUpvoted = () => {
    setUpvotedList((upVotedList) =>
      upVotedList.filter((element) => element !== id)
    );
  };
  const addDownvoted = () => {
    setDownvotedList((downVotedList) => [...downVotedList, id]);
  };
  const removeDownvoted = () => {
    setDownvotedList((downVotedList) =>
      downVotedList.filter((element) => element !== id)
    );
  };
  const patchVote = (vote, id) => {
    setData(
      data.map((element) =>
        element.article_id === id
          ? { ...element, votes: element.votes + vote }
          : element
      )
    );
    patchFunction(id, vote);
  };

  event.preventDefault();

  if (isUpvote) {
    if (noVotes) {
      addUpvoted();
      patchVote(1, id);
    } else if (upVoted) {
      removeUpvoted();
      patchVote(-1, id);
    } else if (downVoted) {
      addUpvoted();
      removeDownvoted();
      patchVote(2, id);
    }
  } else {
    if (noVotes) {
      addDownvoted();
      patchVote(-1, id);
    } else if (downVoted) {
      removeDownvoted();
      patchVote(1, id);
    } else if (upVoted) {
      addDownvoted();
      removeUpvoted();
      patchVote(-2, id);
    }
  }
}

export default handleVote;
