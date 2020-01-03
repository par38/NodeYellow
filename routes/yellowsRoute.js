const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')

const db = require('../config/db')

const { YellowModel } = require('../models/yellowModel')



router

  // //////////    localhost:3004/yellows
  // //////////    GET ALL
  .get('/', (req, res) => {
    YellowModel.find((err, employeesList) => {
      if (err) {
        res.send(err)
      }
      res.status(200).send(employeesList)
    })
  })


  // //////////    localhost:3004/yellows/5dfcec69db94ea265189aee6
  // //////////    GET SINGLE EMPLOYEE
  .get('/:id', (req, res) => {
    YellowModel.findById(
      req.params.id, (err, singleEmp) => {
        if (err) { res.send(`L'employé demandé n'existe pas`) }
        res.send(singleEmp)
      }
    )
  })

  // //////////    localhost:3004/yellows/add
  // //////////    POST single employee
  .post('/add', (req, res) => {

    // ++++++++ req.body global ++++++++++++
    // ++++++++ en front-end, formulaire : name, mail, city
    let emp = new YellowModel({
      nom: req.body.nom,
      mail: req.body.mail,
      ville: req.body.ville,
      age: req.body.age,
      famille: req.body.famille,
      role: req.body.role,
      password: req.body.password
    })

    emp.save((err) => {
      if (err) { res.send(err) }
      res.status(200).send(emp)
    })

  })


  // //////////    faire un get avant, de façon à avoir les champs préremplis et ne pas effacer les données pas modifiées

  // //////////    PUT findById
  // //////////    localhost:3004/yellows/modify/5dfcec69db94ea265189aee6
  // ++++++++ en front-end, formulaire : name, mail, city
  .put('/modify/:id', (req, res) => {
    YellowModel.findById(req.params.id, (err, yellowPut) => {
      if (err) { res.send(err) }

      yellowPut.nom = req.body.nom
      yellowPut.mail = req.body.mail
      yellowPut.ville = req.body.ville
      yellowPut.age = req.body.age
      yellowPut.famille = req.body.famille
      yellowPut.role = req.body.role
      yellowPut.password = req.body.password

      yellowPut.save((err) => {
        if (err) { res.send(err) }
        res.json(yellowPut)
      })
    })
  })

  // //////////    PUT updateOne
  // //////////    localhost:3004/yellows/modify/name/Jean
  // //////////    modify only the mail adress (don't erase the others fields)
  // //////////    params: name
  // //////////    form: mail
  .put('/modify/name/:name', (req, res) => {
    YellowModel.updateOne({ nom: req.params.nom }, { mail: req.body.mail }, (err, updatedEmp) => {
      if (err) { res.send(err) }
      res.status(200).send(`mail de ${req.params.nom} modifiée`)
    })
  })

  // //////////    DELETE findByIdAndDelete
  // //////////    localhost:3004/yellows/delete/5dee6e7291b56a6ee9a6bcef
  // //////////    params: id
  .delete('/delete/:id', (req, res) => {
    idToDelete = req.params.id
    YellowModel.findByIdAndDelete(idToDelete, (err) => {
      if (err) { res.send(err) }
      res.send('Employé supprimé')
    })
  })

  // //////////    DELETE deleteOne
  // //////////    localhost:3004/yellows/delete/name/jacques
  // //////////    params: name

  .delete('/delete/name/:name', (req, res) => {
    YellowModel.deleteOne({ nom: req.params.nom }, (err) => {
      if (err) { res.send(err) }
      res.send('Employé supprimé')
    })
  })

module.exports = router