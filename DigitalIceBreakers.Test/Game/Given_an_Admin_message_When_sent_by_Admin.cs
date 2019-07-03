﻿using DigitalIcebreakers.Games;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Shouldly;
using System;
using System.Linq;

namespace DigitalIcebreakers.Test
{
    [TestClass]
    public class Given_an_Admin_message_When_sent_by_Admin
    {
        private MockGame _game;

        [TestInitialize]
        public void Setup()
        {
            var playerId = Guid.NewGuid();
            var adminId = Guid.NewGuid();
            _game = new MockGame();
            var lobby = ObjectMother.GetLobby(adminId, _game);
            lobby.Players.Add(ObjectMother.GetPlayer(playerId));
            var gameHub = ObjectMother.GetMockGameHub(adminId, lobby);
            var payload = JsonConvert.SerializeObject(new {
                admin = new {content = "CONTENT", lane = 0}
            });
            Should.NotThrow(async () => { await gameHub.HubMessage(payload); });
        }

        [TestMethod]
        public void Then_is_forwarded_to_Game()
        {
            _game.AdminMessages.ShouldNotBeEmpty();
            _game.ClientMessages.ShouldBeEmpty();
            _game.SystemMessages.ShouldBeEmpty();   
        }
    }
}