// document.querySelectorAll('.comment-link').forEach((link) => {
//     link.addEventListener('click' , () => {
//         document.querySelectorAll('.comment-form').forEach((eachForm) => {

//         })
//     })
// })

const commentLink = document.querySelectorAll('.comment-link');
const commentform = document.querySelectorAll('.comment-form');
commentLink.forEach((link) => {
    link.addEventListener('click' , () => {
       console.log(Array.from(commentLink).indexOf(link));
      commentform.forEach((eachForm) => {
          eachForm.classList.toggle('show');
          if(Array.from(commentform).indexOf(eachForm) == Array.from(commentLink).indexOf(link)) {
            
        }
      })
    })
})