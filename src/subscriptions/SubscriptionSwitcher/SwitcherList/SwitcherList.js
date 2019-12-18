import React, { Component } from 'react';
import { isEqual } from 'lodash';
import Link from 'common/Link';
import styles from '../index.module.css';

class SwitcherList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(oldProps) {
    if (this.props.userId !== oldProps.userId) {
      this.fetchData();
    }
  }

  fetchData() {
    const { fetchSubs, userId, findAllSubs } = this.props;
    fetchSubs(userId);
    findAllSubs();
  }

  render() {
    const { active, subs, route, allSubs } = this.props;
    if (!subs || subs.length === 0) { return null; }
    console.log("all", allSubs)
    return subs.filter(item => allSubs && !allSubs.find(value => item.id === value.subscription)).map(sub => {
      if (isEqual(sub, active)) { return null; }
      return (
        <Link key={sub.id} className={styles.listItem} to={route(sub.id)}>
          <div className={styles.avi}>
            {sub.first_name[0]}
            {sub.last_name[0]}
          </div>
          {sub.first_name} {sub.last_name}
        </Link>
      );
    });
  }
}

export default SwitcherList;
