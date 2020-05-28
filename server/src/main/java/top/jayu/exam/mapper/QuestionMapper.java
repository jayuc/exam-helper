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

}