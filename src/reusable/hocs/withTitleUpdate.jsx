import React, { useEffect } from 'react';


function withTitleUpdate(Component, newTitle) {
  return (props => {

    useEffect(() => {
      document.title = `Pomodoro | ${newTitle}`;
    }, []);

    return <Component {...props} />
  })
}

export default withTitleUpdate;
