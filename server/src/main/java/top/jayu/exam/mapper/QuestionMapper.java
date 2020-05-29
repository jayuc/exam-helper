package top.jayu.exam.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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
                    "<if test='tag != null'>and tag like '%'||#{tag}||'% </if>" +
            "</script>"
    )
    List<Question> selectSelective(Question record);

}