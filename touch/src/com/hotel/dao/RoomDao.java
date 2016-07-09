package com.hotel.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Room;
import com.hotel.var.FinalValue;

@Repository
@SuppressWarnings("unchecked")
public class RoomDao {
  @Autowired
  private SessionFactory sessionFactory;

  public Room save(Room room) {
    return (Room) sessionFactory.getCurrentSession().merge(room);
  }

  public Room getById(String id) {
    return (Room) sessionFactory.getCurrentSession().get(Room.class, id);
  }

  public Room getByRoomNo(String roomNo) {
    String hql = "from Room as o where o.roomNo=?";
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    query.setString(0, roomNo);
    List result = query.list();
    Room room = (Room) (result.size() == 0 ? null : result.get(0));
    return room;
  }

  public List<Room> getAvaliableRoom(Date startDate, Date endDate, String roomType) {
    List<Room> result = new ArrayList<Room>();
    String hql = "select room from Room room where room.category.code=? and room not in (select r.subscription.room from Reside r where r.resideDate between ? and ?)";
    System.out.println(hql);
    Query query = sessionFactory.getCurrentSession().createQuery(hql);
    query.setString(0, roomType);
    query.setDate(1, startDate);
    query.setDate(2, endDate);
    result = query.list();
    return result;
  }

  public List<Room> queryRoom(String category, Date startDate) {
    List<Room> result = new ArrayList<Room>();
    Query query;
    if (startDate == null) {
      String hql = "select room from Room room where room.category.code like ?";
      query = sessionFactory.getCurrentSession().createQuery(hql);
      if (category.equals(FinalValue.CATE_ANY)) {
        query.setString(0, "%");
      }
      if (category.equals(FinalValue.CATE_FIRSRT)) {
        query.setString(0, "first");
      }
      if (category.equals(FinalValue.CATE_SECOND)) {
        query.setString(0, "second");
      }
      if (category.equals(FinalValue.CATE_THIRD)) {
        query.setString(0, "third");
      }
    } else {
      String hql = "select room from Room room where room.category.code like ? and room not  in (select s.room from Subscription s where ?  between s.startDate and s.endDate)";
      // "select from reside r where r.resideDate!=date"
      // "select s.room from subscription s where ? not between s.startDate and s.endDate "
      query = sessionFactory.getCurrentSession().createQuery(hql);
      if (category.equals(FinalValue.CATE_ANY)) {
        query.setString(0, "%");
        query.setDate(1, startDate);
      }
      if (category.equals(FinalValue.CATE_FIRSRT)) {
        query.setString(0, "first");
        query.setDate(1, startDate);
      }
      if (category.equals(FinalValue.CATE_SECOND)) {
        query.setString(0, "second");
        query.setDate(1, startDate);
      }
      if (category.equals(FinalValue.CATE_THIRD)) {
        query.setString(0, "third");
        query.setDate(1, startDate);
      }
    }
    result = query.list();
    return result;
  }
}
