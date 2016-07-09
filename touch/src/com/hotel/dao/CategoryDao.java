package com.hotel.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Category;

@Repository
@SuppressWarnings("unchecked")
public class CategoryDao {
  @Autowired
  private SessionFactory sessionFactory;

  public Category save(Category category) {
    return (Category) sessionFactory.getCurrentSession().merge(category);
  }

  public Category getById(String id) {
    return (Category) sessionFactory.getCurrentSession().get(Category.class, id);
  }

  public void delete(Category category) {
    sessionFactory.getCurrentSession().delete(category);
  }

  public Category getByCode(String code) {
    String hql = "from Category as o where o.code=?";
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    query.setString(0, code);
    List result = query.list();
    Category category = (Category) (result.size() == 0 ? null : result.get(0));
    return category;
  }

  public List<Category> getAllCategories() {
    String hql = "from Category";
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    List<Category> categories = query.list();
    return categories;
  }
}
