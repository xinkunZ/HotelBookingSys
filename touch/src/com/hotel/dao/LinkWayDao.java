package com.hotel.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hotel.entity.LinkWay;

@Repository
@SuppressWarnings("unchecked")
public class LinkWayDao {
  @Autowired
  private SessionFactory sessionFactory;

  public LinkWay save(LinkWay LinkWay) {
    return (LinkWay) sessionFactory.getCurrentSession().merge(LinkWay);
  }

  public List<LinkWay> getAllCategories() {
    String hql = "from LinkWay";
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    List<LinkWay> categories = query.list();
    return categories;
  }
}
