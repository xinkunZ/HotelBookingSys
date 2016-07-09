package com.hotel.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.dao.RoomDao;
import com.hotel.entity.Room;
import com.hotel.pageform.QueryRoomCondition;
import com.hotel.pageform.RoomOptions;

@Service
public class RoomService {

  @Autowired
  private RoomDao roomDao;

  @Transactional
  public Room save(Room room) {
    return roomDao.save(room);
  }

  @Transactional
  public Room getByRoomNo(String roomNo) {
    return roomDao.getByRoomNo(roomNo);
  }

  @Transactional
  public Room getById(String id) {
    return roomDao.getById(id);
  }

  @Transactional
  public List<RoomOptions> getAvaliableRoomOptions(Date startDate, Date endDate, String roomType) {

    List<Room> avaliableRoom = roomDao.getAvaliableRoom(startDate, endDate, roomType);
    List<RoomOptions> list = new ArrayList<RoomOptions>();
    if (avaliableRoom == null) {
      list = null;
    } else {
      for (Room room : avaliableRoom) {
        RoomOptions options = new RoomOptions();
        options.setText(room.getRoomNo());
        options.setValue(room);
        list.add(options);
      }
    }
    return list;
  }

  @Transactional
  public List<Room> queryRoom(QueryRoomCondition condition) {
    List<Room> result = new ArrayList<Room>();
    String category = condition.getCategory();
    Date startDate = condition.getStartDate();
    result = roomDao.queryRoom(category, startDate);
    return result;
  }
}
