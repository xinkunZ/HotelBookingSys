package com.hotel.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.dao.MemberDao;
import com.hotel.dao.ResideDao;
import com.hotel.dao.SubscriptionDao;
import com.hotel.entity.Reside;
import com.hotel.entity.Subscription;

@Service
public class SubscriptionService {

  @Autowired
  private SubscriptionDao subscriptionDao;

  @Autowired
  private ResideDao resideDao;

  @Autowired
  private MemberDao memberDao;

  @Transactional
  public Subscription save(Subscription subscription) {

    Date startDate = subscription.getStartDate();
    Date endDate = subscription.getEndDate();
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(startDate);
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
    String orderNo = sdf.format(date);
    subscription.setOrderNo(orderNo);
    subscription.setCreTime(date);
    List<Reside> resides = new ArrayList<Reside>();
    while (calendar.getTime().compareTo(endDate) <= 0) {
      Reside reside = new Reside();
      reside.setResideDate(calendar.getTime());
      reside.setSubscription(subscription);
      resides.add(reside);
      // resideDao.save(reside);
      calendar.add(Calendar.DAY_OF_WEEK, 1);
    }
    subscription.setResides(resides);
    Subscription result = subscriptionDao.save(subscription);
    return result;
  }

  @Transactional
  public List<Subscription> getSubListByMember(String memberId) {
    List<Subscription> result = new ArrayList<Subscription>();
    List<Subscription> subscriptions = subscriptionDao.getSubList(memberId);
    for (Subscription s : subscriptions) {
      result.add(s);
    }
    return result;
  }

  @Transactional
  public Subscription getSubByNo(String orderNo) {
    return subscriptionDao.getSubByNo(orderNo);
  }

  @Transactional
  public Subscription getById(String id) {
    return subscriptionDao.getById(id);
  }

  @Transactional
  public void delete(Subscription subscription) {
    subscriptionDao.delete(subscription);
  }

}
