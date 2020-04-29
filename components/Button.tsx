import React, {FunctionComponent, MouseEvent} from 'react';


interface Props {
  // event paramater must be a MouseEvent performed to a <button>.
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}


/**
 * Using FunctionalComponent allows us to use children without having to
 * explicitly define them in the Props interface. Same would go with the
 * props parameter, but since we want to define a default value for
 * loading property (to make the component reusable), we have to include
 * children too anyway.
 *
 * According to some internet sources, defaultProps will get deprecated
 * for functional components, and passing the default values as normal
 * function parameters is the recommended way.
 */
export const Button: FunctionComponent<Props> = ({onClick, children, loading = false}) => <div>
  <button onClick={onClick} className={loading ? 'loading' : ''}>
    {children}
  </button>
  <style jsx>
    {`
      div { text-align: center; }

      button {
        display: inline-block;
        padding: 0.5rem 1rem;
        margin: 2rem auto;
        border-top: 3px solid #de9a07;
        border-right: 3px solid #bf9a49;
        border-bottom: 3px solid #bf9a49;
        border-left: 3px solid #de9a07;
        font-size: 1.25rem;
        color: #bf9a49;
        background-color: #383838;
        cursor: pointer;
      }
      button.loading {
        background: no-repeat center url('./spinner.gif');
        color: #ffffff00;
      }
    `}
  </style>
</div>;
