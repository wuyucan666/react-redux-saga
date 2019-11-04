import React from 'react';

export default () => {
  return (
    <div style={styles.footer}>
      <div style={styles.copyright}>叮咚收藏 ©  版权所有</div>
    </div>
  );
};

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: '0',
    right: '0',
    bottom: '20px',
  },
  links: {
    marginBottom: '8px',
  },
  link: {
    fontSize: '13px',
    marginRight: '40px',
    color: 'rgba(0, 0, 0, .45)',
  },
  copyright: {
    fontSize: '13px',
    color: 'rgba(0, 0, 0, .45)',
    lineHeight: 1.5,
    textAlign: 'right',
  },
};
