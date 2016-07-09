package com.hotel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.dao.LinkWayDao;
import com.hotel.entity.LinkWay;

@Service
public class LinkWayService {
  @Autowired
  private LinkWayDao linkWayDao;

  @Transactional
  public LinkWay save(LinkWay LinkWay) {
    return linkWayDao.save(LinkWay);
  }

  @Transactional
  public List<LinkWay> getAllCategories() {
    return linkWayDao.getAllCategories();
  }
}
