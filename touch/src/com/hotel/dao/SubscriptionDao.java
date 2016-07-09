package com.hotel.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Subscription;

@Repository
@SuppressWarnings("unchecked")
public class SubscriptionDao {
  @Autowired
  private SessionFactory sessionFactory;

  public Subscription save(Subscription subscription) {
    return (Subscription) sessionFactory.getCurrentSession().merge(subscription);
  }

  public Subscription getById(String id) {
    return (Subscription) sessionFactory.getCurrentSession().get(Subscription.class, id);
  }

  public void delete(Subscription subscription) {
    sessionFactory.getCurrentSession().delete(subscription);
  }

  public List<Subscription> getSubList(String id) {
    List<Subscription> subscriptions = new ArrayList<Subscription>();
    String hql = "from Subscription s where s.member.uuid=? ";
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    query.setString(0, id);
    subscriptions = query.list();
    return subscriptions;
  }

  public Subscription getSubByNo(String orderNo) {
    List<Subscription> subscriptions = new ArrayList<Subscription>();
    String hql = "from Subscription s where s.orderNo=?";
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    query.setString(0, orderNo);
    subscriptions = query.list();
    return subscriptions.size() == 0 ? null : subscriptions.get(0);
  }
}
