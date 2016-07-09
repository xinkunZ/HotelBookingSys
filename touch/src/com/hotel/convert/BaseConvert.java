package com.hotel.convert;

public interface BaseConvert<S, T> {

  public T convert(S source);
}
