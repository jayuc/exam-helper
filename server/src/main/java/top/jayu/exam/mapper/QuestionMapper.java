package top.jayu.exam.mapper;

import top.jayu.exam.entry.Question;

public interface QuestionMapper {
    int insert(Question record);

    int insertSelective(Question record);
}