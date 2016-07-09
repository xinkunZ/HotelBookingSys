package com.hotel.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Reside;

@Repository
@SuppressWarnings("unchecked")
public class ResideDao {
  @Autowired
  private SessionFactory sessionFactory;

  public Reside save(Reside reside) {
    return (Reside) sessionFactory.getCurrentSession().merge(reside);
  }

  public Reside getById(String id) {
    return (Reside) sessionFactory.getCurrentSession().get(Reside.class, id);
  }

  public void delete(Reside reside) {
    sessionFactory.getCurrentSession().delete(reside);
  }

}
