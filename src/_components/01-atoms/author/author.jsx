// const data = {
//   text: 'Made ❤ with by',
//   name: 'SUMAQ Websites',
//   link: 'https://sumaqsites.com'
// }
const React = require('react')

const Author = (props) => {
  return (
    <p class="author">
      {props.text}&nbsp;
      <a target="_blank" href="{props.link}">
        {props.name}
      </a>
    </p>
  )
}

module.exports = Author
