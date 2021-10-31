import '@testing-library/jest-dom';

import { LogIn } from '@meridio/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Session } from 'next-auth';
import React from 'react';

describe('LogIn', function () {
  const defaultProps = {
    session: {} as Session,
    logIn: () => {},
    logOut: () => {},
  };

  describe('layout', function () {
    it('should show the logo and a button to log in when there is no session', function () {
      const props = {
        ...defaultProps,
        session: undefined,
      };

      render(<LogIn {...props} />);

      expect(screen.queryByRole('img')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Iniciar sesión con GitHub' })).toBeInTheDocument();
    });

    it('should should show the logo and a button to log out when there is session', function () {
      const props = {
        ...defaultProps,
        session: {} as Session,
      };

      render(<LogIn {...props} />);

      expect(screen.queryByRole('img')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Cerrar sesión' })).toBeInTheDocument();
    });
  });

  describe('behaviour', function () {
    it('should execute logIn when clicking the log in button', function () {
      const props = {
        ...defaultProps,
        session: undefined,
        logIn: jest.fn(),
      };

      render(<LogIn {...props} />);
      const logInButton = screen.getByRole('button', { name: 'Iniciar sesión con GitHub' });
      userEvent.click(logInButton);

      expect(props.logIn).toHaveBeenCalled();
    });

    it('should execute logOut when clicking the log out button', function () {
      const props = {
        ...defaultProps,
        session: {} as Session,
        logOut: jest.fn(),
      };

      render(<LogIn {...props} />);
      const logOutButton = screen.getByRole('button', { name: 'Cerrar sesión' });
      userEvent.click(logOutButton);

      expect(props.logOut).toHaveBeenCalled();
    });
  });
});
