import { Card } from '@aws-amplify/ui-react';
import { css } from '@emotion/css';
import { Todo } from '../API';

function TodoCard({ todo }: { todo: Todo; }) {
  const {
    name,
    id,
    description,
    createdAt
  } = todo;

  return (
    <Card key={id}>
      <div className={containerStyle}>
        <div className={todoCardGroup}>
          <label><strong>Name</strong></label>
          <p>{name || 'empty'}</p>
        </div>
        <div className={todoCardGroup}>
          <label><strong>Description</strong></label>
          <p>{description || 'empty'}</p>
        </div>
        <div className={todoCardGroup}>
          <label><strong>Created Date</strong></label>
          <p>{new Date(createdAt).toDateString()}</p>
        </div>
      </div>
    </Card>
  );
}

export default TodoCard;

const containerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  flexDirection: 'column',
  border: '1px solid gray',
  borderRadius: '5px',
  margin: '15px',
  padding: '5px 50px',
});

const todoCardGroup = css({
  margin: '40px 20px'
});
