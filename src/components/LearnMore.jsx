const LearnMore = () => {
    return (<>
    <div className="learn-more-content">
    <p>
        Simplify your life, <br></br> organize your day, <br></br> all in one place.
      </p>
        <p>
          © {new Date().getFullYear()} Celia Cebaquebas Calero
        </p>
        <a
          href="https://github.com/cccaelum"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
             <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24px"
          height="24px"
          className="github-icon"
        >
          <path d="M12 .297C5.375.297 0 5.673 0 12.3c0 5.3 3.438 9.8 8.205 11.385.6.112.793-.263.793-.585v-2.065c-3.338.724-4.042-1.416-4.042-1.416-.546-1.385-1.333-1.753-1.333-1.753-1.089-.742.084-.727.084-.727 1.205.085 1.84 1.23 1.84 1.23 1.07 1.834 2.807 1.303 3.492.997.108-.776.418-1.304.763-1.603-2.665-.303-5.466-1.333-5.466-5.93 0-1.311.465-2.382 1.235-3.223-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 6.003 0c2.292-1.553 3.3-1.23 3.3-1.23.653 1.653.241 2.873.118 3.176.77.841 1.234 1.912 1.234 3.223 0 4.61-2.804 5.624-5.476 5.92.43.372.823 1.104.823 2.222v3.293c0 .322.192.7.801.585C20.565 22.1 24 17.6 24 12.3c0-6.627-5.375-12.003-12-12.003z" />
        </svg>
        </a>
        </div>
        </>
    );
  };
  
  export default LearnMore;