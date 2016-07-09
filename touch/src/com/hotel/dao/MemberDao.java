package com.hotel.dao;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Member;

@Repository
@SuppressWarnings("unchecked")
public class MemberDao {
  @Autowired
  private SessionFactory sessionFactory;

  public Member save(Member member) {
    return (Member) sessionFactory.getCurrentSession().merge(member);
  }

  public Member getById(String id) {
    return (Member) sessionFactory.getCurrentSession().get(Member.class, id);
  }

  public void delete(Member member) {
    sessionFactory.getCurrentSession().delete(member);
  }

  public Member getByUserName(String userName) {
    Member member = new Member();
    String hql = "from Member m where m.userName=?";
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    query.setString(0, userName);
    member = (Member) (query.list().size() != 0 ? query.list().get(0) : null);
    return member;
  }

}
