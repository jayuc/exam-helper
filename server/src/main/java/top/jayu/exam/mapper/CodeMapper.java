package top.jayu.exam.mapper;

import top.jayu.exam.entry.Code;

public interface CodeMapper {
    int insert(Code record);

    int insertSelective(Code record);
}