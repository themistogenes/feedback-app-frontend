import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 9,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero blanditiis cum culpa nihil, expedita modi a magni molestias sapiente molestiae quibusdam quasi in? Placeat accusamus tenetur necessitatibus itaque quasi fuga.',
    },
    {
      id: 2,
      rating: 8,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero blanditiis cum culpa nihil, expedita modi a magni molestias sapiente molestiae quibusdam quasi in? Placeat accusamus tenetur necessitatibus itaque quasi fuga.',
    },
    {
      id: 3,
      rating: 10,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero blanditiis cum culpa nihil, expedita modi a magni molestias sapiente molestiae quibusdam quasi in? Placeat accusamus tenetur necessitatibus itaque quasi fuga.',
    }
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback])
    console.log(newFeedback);
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id ))
    }
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  // Update item
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => (
      item.id === id? {...item, ...updItem} : item
    )))
  }

  return (
    <FeedbackContext.Provider 
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext