import express from 'express';
import { Student, Project } from '../models/index.mjs';
import crypto from 'crypto';
const router = express.Router();

const salt = process.env.name || 'fyb'
function checkAuth(authCode, uuid) {
  try {
    const md5 = crypto.createHash('md5')
    let trueAuthCode = md5
      .update(salt + uuid)
      .digest('hex')
      .toUpperCase()
      .slice(0, 32)
    console.log('code', trueAuthCode)
    if (authCode.toUpperCase() === trueAuthCode.toUpperCase()) {
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}

router.post('/addProject', async (req, res) => {
  if (req.body.id) { //update
    await Project.update(req.body, { where: { id: req.body.id } });
    for (let student of req.body.Students) {
      if (student.id) {
        await Student.update(student, { where: { id: student.id } });
        console.log('------update student------');
      } else {
        await Student.create({ ...student, ProjectId: req.body.id });
        console.log('------create student------');
      }
    }
  } else {
    let project = await Project.create({
      url: req.body.url
    })

    for (let el of req.body.Students) {
      await project.addStudent(await Student.create(el));
    }
    await project.save();
  }
  return res.json({
    success: true
  })
});

router.get('/listProjects', async (req, res) => {
  const projects = await Project.findAll({
    include: Student
  })
  // console.log(JSON.stringify(projects));
  return res.json({
    success: true,
    data: projects
  })
});

router.post('/auth', async (req, res) => {
  if (req.body.uuid && req.body.authCode && checkAuth(req.body.authCode, req.body.uuid)) {
    return res.json({
      success: true
    })
  }
  return res.json({
    success: false
  })
})

router.post('/setProject', async (req, res) => {
  if (req.body.id) { //update
    await Project.update(req.body, { where: { id: req.body.id } });
  }
  return res.json({
    success: true
  })
})

export default router;