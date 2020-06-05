package top.jayu.exam.mapper;

import org.apache.ibatis.annotations.*;
import top.jayu.exam.entry.Question;

import java.util.List;

@Mapper
public interface QuestionMapper {

    @Insert(
            "insert into t_question (question,answer,question_type,section_type,subject_type,language_type,create_time,ower,tag,remark) values " +
            "(trim(#{record.question}),trim(#{record.answer}),#{record.questionType},#{record.sectionType},#{record.subjectType}," +
            "#{record.languageType},now(),trim(#{record.ower}),trim(#{record.tag}),trim(#{record.remark}))"
    )
    int insert(@Param("record") Question record);

    @Select(
            "select id,question,answer,question_type,section_type,subject_type,language_type,create_time,ower,tag,remark from t_question"
    )
    List<Question> selectAll();

    @Select(
            "select id,question,answer,question_type,section_type,subject_type,language_type,create_time,ower,tag,remark from t_question " +
            "where id = #{id}"
    )
    Question selectById(@Param("id") int id);

    @Select(
            "<script>" +
            "select id,question,answer,question_type,section_type,subject_type,language_type,create_time,ower,tag,remark from t_question " +
                    "where 1 = 1 " +
                    "<if test='questionType != null'>and question_type = #{questionType} </if>" +
                    "<if test='sectionType != null'>and section_type = #{sectionType} </if>" +
                    "<if test='subjectType != null'>and subject_type = #{subjectType} </if>" +
                    "<if test='languageType != null'>and language_type = #{languageType} </if>" +
                    "<if test='ower != null'>and ower = #{ower} </if>" +
                    "<if test='tag != null'>and tag like CONCAT('%',#{tag},'%') </if>" +
            "</script>"
    )
    List<Question> selectSelective(Question record);

    @Update(
            "<script>" +
                    "update t_question " +
                    "<set>" +
                        "<if test='question != null'>question = #{question}, </if>" +
                        "<if test='answer != null'>answer = #{answer}, </if>" +
                        "<if test='questionType != null'>question_type = #{questionType}, </if>" +
                        "<if test='sectionType != null'>section_type = #{sectionType}, </if>" +
                        "<if test='subjectType != null'>subject_type = #{subjectType}, </if>" +
                        "<if test='languageType != null'>language_type = #{languageType}, </if>" +
                        "<if test='ower != null'>ower = #{ower}, </if>" +
                        "<if test='tag != null'>tag = #{tag}, </if>" +
                    "</set>" +
                    "where id = #{id}" +
            "</script>"
    )
    int update(Question record);

}