import classNames from 'classnames';
import * as React from 'react';

import styles from './card.module.scss';

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card"
      className={classNames(styles.card, className)}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-header"
      className={classNames(styles.header, className)}
      {...props}
    />
  );
};

const CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <h4
      data-slot="card-title"
      className={classNames(styles.title, className)}
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <p
      data-slot="card-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  );
};

const CardAction = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-action"
      className={classNames(styles.action, className)}
      {...props}
    />
  );
};

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-content"
      className={classNames(styles.content, className)}
      {...props}
    />
  );
};

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-footer"
      className={classNames(styles.footer, className)}
      {...props}
    />
  );
};

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
