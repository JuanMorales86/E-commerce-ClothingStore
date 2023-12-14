const EmailTemplate = ({ firstName }) => {
  const html = `
    <div>
      <h1>Welcome, ${firstName}!</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim aliquid nam minima autem accusamus suscipit.</p>
      <button style="background-color: ButtonShadow; padding-top: 3; padding-bottom: 2;">
        <a href='https://faztweb.com'>Go to fazt web</a>
      </button>
    </div>
  `;

  return html;
};

module.exports = EmailTemplate;





// const React = require('react');

// const EmailTemplate = ({ firstName }) => {
//   return React.createElement('div', null,
//     React.createElement('h1', null, `Welcome, ${firstName}!`),
//     React.createElement('p', null, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim aliquid nam minima autem accusamus suscipit.'),
//     React.createElement('button', { style: { backgroundColor: "ButtonShadow", paddingTop: "3", paddingBottom: "2" } },
//       React.createElement('a', { href: 'https://faztweb.com' }, 'Go to fazt web')
//     )
//   );
// };

// module.exports = EmailTemplate;
